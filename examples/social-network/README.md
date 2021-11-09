# Social Network Example

This example was created as part of the [talk Fran Mendez did at QCon Plus 2021](https://plus.qconferences.com/plus2021/speakers/fran-mendez).

## Run it

There are three services. All of them can be started by running:

```
npm run dev
```

You'll have to customize the `db.json` file with your own data (especially the Slack IDs).

For the notifications service, you'll have to configure the Slack API URL in the `.env` file. Head over https://api.slack.com/messaging/webhooks to know more.
