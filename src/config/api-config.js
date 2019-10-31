import _ from 'lodash'

// Router
const app = {
  
}

const auth = {
  login: (data) => {
    return {
      url: '/v1/ss_app/post_direct_sale_login',
      method: 'post',
      data
    }
  },
}

const users = {
  getAllProduct: (data) => {
    return {
      url: '/v1/ss_app/post_read_many_products_n_services',
      method: 'post',
      data
    }
  },
  detectId: (data) => {
    return {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      url: '/v1/ss_app/post_document_detect',
      method: 'post',
      data
    }
  },
  compareFace: (data) => {
    return {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      url: '/v1/ss_app/post_face_compare',
      method: 'post',
      data
    }
  },
  saveCard: (data) => {
    return {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      url: '/v1/ss_app/post_save_application',
      method: 'post',
      data
    }
  },
  showAllApp: (data) => {
    return {
      url: '/v1/ss_app/post_read_many_applications',
      method: 'post',
      data
    }
  }
}

export default {
  app,
  auth,
  users,
}
