export default {
  currentPage: 'Login',
  identities: [],
  constructions: [],
  login: {
    ok: false,
    errMsg: '',
    identity: '',
    userInfo: {},
  },
  // Need Refactor
  myReservations: {
    data: [],
    filterBy: '',
    showingReservationId: 0
  },
  allReservations: {
    data: [],
    filterBy: '',
    showingReservationId: 0
  },
  partialReservations: [],
  reservation: {
    data: {},
    updateOk: false,
    errMsg: ''
  },
  createReservation: {
    location: '',
    date: '',
    timeSlot: '',
    licensePlateNumber: '',
    material: '',
    pictureUris: [],
    ok: false,
    errMsg: ''
  },
  updateReservation: {
    ok: false,
    errMsg: ''
  },
  notification: {
    origin: '',
    data: '',
    enableOverlay: false,
    ref: null
  },
  monitor: {
    image: '',
    carNumber: 0,
    alertSwitchState: false,
    errMsg: ''
  },
  system: {
    appState: 'active'
  }
};
