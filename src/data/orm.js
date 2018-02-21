import { ORM } from 'redux-orm'

import HubModel from './hub/model'
import ProjectModel from './project/model'
import RequestModel from './request/model'
import OfferModel from './offer/model'
import UserModel from './user/model'
import CommentModel from './comment/model'
import ChatModel from './chat/model'
import ChatByUserModel from './chatByUser/model'
import MessageModel from './message/model'

const orm = new ORM()
orm.register(
  UserModel,
  HubModel,
  ProjectModel,
  OfferModel,
  RequestModel,
  CommentModel,
  ChatModel,
  ChatByUserModel,
  MessageModel
)

export default orm
