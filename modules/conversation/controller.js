const logger = require('../../modules/logger');
const models = require('../../modules/dal/database').models();
const parse = require('co-body');
const conversationHelper = require('../../modules/service/helpers/conversation');


/**
 * Conversation Controller
 *
 * @module conversationController
 */
module.exports = {
/** Find a conversation for a username.
@param username {string} - GET /conversation/username
*/
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

/** Create a new conversation.
@param JSON {string} - POST /conversation/create
Example request body:
{
  "from": "Joe Fox",
  "to": "Kathleen Kelly",
  "subject": "Dear Friend",
  "message": "You know, sometimes I wonder..."
}
*/
            * create() {

                const body = yield parse.json(this);

                var to = yield conversationHelper.findUserByName(body.to);
                var from = yield conversationHelper.findUserByName(body.from);

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

                models.conversation.findOne().where({
                    id: this.params.id
                }).populate('messages').then(function (conversation) {
                    if (!conversation || conversation.messages.length == 0) {
                        return
                    }
                    conversation.messages.forEach(message => {
                        message.destroy();
                    });
                });

                this.body = yield models.conversation.destroy({
                    id: this.params.id,
                });
            },

/** Update a conversation with a new message.
@param JSON {string} - PUT /conversation
Example request body:
{
  "from": "Joe Fox",
  "to": "Kathleen Kelly",
  "subject": "Dear Friend",
  "message": "You know, sometimes I wonder..."
}
*/
        * update() {
            const body = yield parse.json(this);
            logger.log('debug', `Update conversation ${body.conversationId}.`);
            var conversation = yield models.conversation.findOne( {id: body.conversationId} ).populate('messages');
            
            if (!conversation) return this.body = '{ "INFO": "No conversation found matching requested conversationId."}';
            
            var to = yield conversationHelper.findUserByName(body.to);
            var from = yield conversationHelper.findUserByName(body.from);
            
            var date = new Date();
            var newMessage = yield models.message.create({
                    to: to.id,
                    from: from.id,
                    messageText: body.message,
                    seen: false,
                    date: date
                });
            
            conversation.messages.push(newMessage);
            
            this.body = yield models.conversation.update(conversation.id, conversation);
        },

};