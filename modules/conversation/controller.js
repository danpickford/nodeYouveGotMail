const logger = require('../../modules/logger');
const models = require('../../modules/dal/database').models();
const parse = require('co-body');

module.exports = {

    * findByUserName() {
            logger.log('debug', 'Get Conversation');
            var user = yield models.user.findOne().where({
                username: this.params.id
            });

            this.body = yield models.conversation.find().populate('messages').populate('participants', {
                where: {
                    id: user.id
                }
            }).then(function (conversations) {
                logger.log('debug', `Got ${conversations.length} conversations for ${user.username}.`)
                return conversations;
            });

        },


        * create() {

            const body = yield parse.json(this);

            var to = yield models.user.findOne().where({
                username: body.to
            });
            var from = yield models.user.findOne().where({
                username: body.from
            });

            var newConversation = yield models.conversation.create();
            newConversation.subject = body.subject;
            newConversation.participants.push(to);
            newConversation.participants.push(from);

            var date = new Date();
            var newMessage = yield models.message.create({
                to: to.id,
                from: from.id,
                messageText: body.message,
                seen: false,
                date: date
            });

            newConversation.messages.push(newMessage);

            logger.log('debug', `Create conversation between ${to.id} and ${from.id}`);
            this.body = yield models.conversation.update(newConversation.id, newConversation);
        },


        * destroy() {
            logger.log('debug', `Destory conversation ${this.params.id}.`);
            
            models.conversation.findOne().where({ id: this.params.id}).populate('messages').then(function (conversation) {
                if (conversation.messages.length == 0) { return }
                    conversation.messages.forEach(message => {
                    message.destroy();
                });
            });
            //logger.log('debug', `messages ${JSON.stringify(messages)}.`);
                        
            var conversation = yield models.conversation.destroy({
                id: this.params.id,
            });
        },

        * update() {
            const body = yield parse.json(this);
            this.body = yield models.conversation.messages.create(body);
        },

};