import { PresignImgUrlPipe } from './presign-img-url.pipe';

describe('PresignImgUrlPipe', () => {
  it('create an instance', () => {
    const pipe = new PresignImgUrlPipe();
    expect(pipe).toBeTruthy();
  });
});
