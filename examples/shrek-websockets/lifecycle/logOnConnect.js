export default async function () {
  console.log('Connection with Shrek established')
}

export const lifecycleEvent = 'onNewConnection'
export const channels = ['/chat']