import * as request from 'supertest';

const publisherUrl = process.env.PUBLISHER_URL;

describe(`e2e redis`, () => {
  test(`data sent to publisher can be obtained from subscriber`, async () => {
    const contentType = 'application/json';

    const postResult = await request(publisherUrl)
      .post('/')
      .send({
        x: 'y',
      })
      .set('Accept', contentType)
      .set('Content-Type', contentType)
      .expect(201)
      .then((res) => res.body);

    expect(postResult).toMatchInlineSnapshot(`
      Object {
        "result": Object {
          "data": "{\\"x\\":\\"y\\"}",
          "message": "Hello from subscriber",
          "success": true,
        },
      }
    `);
  });
});
