import { Sec2TimePipe } from './sec2time.pipe';

describe('Sec2timePipe', () =>
{
    it('create an instance', () =>
    {
        const pipe = new Sec2TimePipe();
        expect(pipe).toBeTruthy();

        expect(pipe.transform(0)).toBe('0m');
        expect(pipe.transform(59)).toBe('0m 59s');
        expect(pipe.transform(60)).toBe('1m');
        expect(pipe.transform(61)).toBe('1m 1s');
        expect(pipe.transform(122)).toBe('2m 2s');
    });
});
