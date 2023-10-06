import request from "@/utils/request";
export const createThreads = (topicId, createThreadsRequest) => {
  return request({
    url: `/threads/create/topic_id=${topicId}`,
    method: "post",
    data: createThreadsRequest,
  });
};

export const getAllThreadsInTopic = (topicId) => {
  return request({
    url: `/threads/topic_id=${topicId}`,
    method: "get",
  });
};

export const getlatestThread = () => {
  return request({
    url: "threads/get_latest_thread",
    method: "get",
  });
};

export const getlatestThreadInTopic = () => {
  return request({
    url: "threads/get_latest_thread_in_topic",
    method: "get",
  });
};
