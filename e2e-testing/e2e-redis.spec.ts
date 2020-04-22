import * as request from 'supertest';

const publisherUrl = process.env.PUBLISHER_URL;
const subscriberUrl = process.env.SUBSCRIBER_URL;

describe(`e2e redis`, () => {
  test(`data sent to publisher can be obtained from subscriber`, async () => {
    const contentType = 'application/json';

    await request(publisherUrl)
      .post('/')
      .send({
        x: 'y',
      })
      .set('Accept', contentType)
      .set('Content-Type', contentType)
      .expect(201);

    const result = await request(subscriberUrl)
      .get('/')
      .set('Accept', contentType)
      .expect(200)
      .then((res) => res.body);

    expect(result[0].data).toMatchInlineSnapshot(`"{\\"x\\":\\"y\\"}"`);
  });
});
