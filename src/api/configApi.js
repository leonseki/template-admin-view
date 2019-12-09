import axiosInstance from '../interceptors/axios';

const IMAGE_LIST = '/api/config/imageList';

export default {
  // 获取图片列表
  imageList(filter, pageSize, current) {
    return axiosInstance.get(IMAGE_LIST, {
      params: { filter, pageSize, current }
    })
  }
}
