let notifications = [
  { id: '1', type: 'like', user: 'Marco Rossi', target: 'your pizza post', time: '2m ago' },
  { id: '2', type: 'follow', user: 'Elena Woods', target: '', time: '15m ago' },
  { id: '3', type: 'mention', user: 'Aria Blue', target: 'in a comment', time: '1h ago' },
  { id: '4', type: 'like', user: 'Sarah Chen', target: 'your coding post', time: '3h ago' },
  { id: '5', type: 'follow', user: 'James Smith', target: '', time: '5h ago' },
  { id: '6', type: 'like', user: 'Alex Rivera', target: 'your mountain photo', time: '8h ago' },
];

export async function getNotifications() {
  return [...notifications];
}
