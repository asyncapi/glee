export const clientAuth = async () => {
  try {
    const response = await fetch("https://slack.com/api/apps.connections.open", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${process.env.SLACK_APP_TOKEN}`
      }
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()

    if (data.ok && data.url) {
      const urlParams = new URLSearchParams(data.url.split('?')[1])
      const ticket = urlParams.get('ticket')
      const app_id = urlParams.get('app_id')

      return {
        ticket,
        app_id
      }
    } else {
      throw new Error('Response format is incorrect or missing data')
    }
  } catch (error) {
    console.error('Error fetching client auth:', error)
    throw error
  }
}
