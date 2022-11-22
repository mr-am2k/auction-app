import { Notification } from 'models/notification';

import agent from 'lib/agent';

const BASE_URL = '/notifications';

const notificationService = {
  getLatestNotification: (userId: string, productId: string) =>
    agent.get<Notification[]>(
      `${BASE_URL}/search?userId=${userId}&productId=${productId}`
    ),
};

export default notificationService;
