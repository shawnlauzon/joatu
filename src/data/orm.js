import { ORM } from 'redux-orm'

import CommunityModel from './community/model'

import { User, Project, Chat, Offer, Message } from './models'

const orm = new ORM()
orm.register(User, CommunityModel, Project, Offer, Chat, Message)

export default orm
