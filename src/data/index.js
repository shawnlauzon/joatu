const mockUniverse = {
  communities: {
    1: {
      id: 1,
      name: 'Laurier'
    }
  },
  projects: {
    0: {
      id: 0,
      community: 1,
      name: 'Clean Park',
      location: 'SW corner of Park Laurier',
      coordinates: {
        lat: 45.530434,
        lng: -73.586968
      },
      start: '2018-02-03T19:00:00Z',
      duration: 150,
      organizer: 0,
      participants: [0, 1]
    },
    1: {
      id: 1,
      community: 1,
      name: 'Plant Garden',
      location: 'Square Georges-Guileault',
      coordinates: {
        lat: 45.529961,
        lng: -73.592063
      },
      start: '2018-02-03T19:00:00Z',
      duration: 120,
      map_coords: 'Sir+Wilfrid+Laurier+Park/@45.5322995,-73.5897065,17z',
      organizer: 0,
      participants: [1]
    }
  },
  trades: {
    0: {
      id: 0,
      community: 1,
      name: 'Ukelele Lessons',
      seller: 1
    },
    1: {
      id: 1,
      community: 1,
      name: 'Vegan Cookies',
      seller: 0
    },
    2: {
      id: 2,
      community: 1,
      name: 'Babysitting',
      seller: 0
    }
  },
  users: {
    0: {
      id: 0,
      name: 'Shawn Lauzon',
      email: 'shawn.lauzon@gmail.com'
    },
    1: {
      id: 1,
      name: 'Jamie Klinger',
      email: 'teddyrux@gmail.com'
    }
  }
};

export default function projects(state = { universe: mockUniverse }, action) {
  const makeEntry = payload => ({ [payload.id]: payload });

  if (action.type === 'CREATE_PROJECT') {
    return {
      projects: Object.assign(
        {},
        this.state.projects,
        makeEntry(action.payload)
      )
    };
  }

  return state;
}
