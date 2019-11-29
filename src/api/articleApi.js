import axiosInstance from '../interceptors/axios';

const ARTICLE_LIST = '/api/article/list';

export default {
  // 获取文章列表
  list(filter, pageSize, current) {
    return axiosInstance.get(ARTICLE_LIST, {
      params: { filter, pageSize, current }
    })
  }
}
