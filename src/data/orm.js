import { ORM } from 'redux-orm'

import CommunityModel from './community/model'
import ProjectModel from './project/model'
import RequestModel from './request/model'
import OfferModel from './offer/model'
import UserModel from './user/model'
import CommentModel from './comment/model'
import ChatModel from './chat/model'
import MessageModel from './message/model'

const orm = new ORM()
orm.register(
  UserModel,
  CommunityModel,
  ProjectModel,
  OfferModel,
  RequestModel,
  CommentModel,
  ChatModel,
  MessageModel
)

export default orm
