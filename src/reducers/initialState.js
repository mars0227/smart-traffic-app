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
  createReservation: {
    location: '',
    date: '',
    timeSlot: '',
    licensePlateNumber: '',
    material: '',
    pictureUri: '',
    ok: false,
    errMsg: ''
  },
  updateReservation: {
    ok: false,
    errMsg: ''
  }
};
