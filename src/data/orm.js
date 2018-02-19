import { ORM } from 'redux-orm'

import CommunityModel from './community/model'
import ProjectModel from './project/model'
import RequestModel from './request/model'
import OfferModel from './offer/model'
import UserModel from './user/model'
import CommentModel from './comment/model'

import { Chat, Message } from './models'

const orm = new ORM()
orm.register(
  UserModel,
  CommunityModel,
  ProjectModel,
  OfferModel,
  RequestModel,
  CommentModel,
  Chat,
  Message
)

export default orm
