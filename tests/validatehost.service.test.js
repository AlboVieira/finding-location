describe('Finding IP App', function () {

    beforeEach(module('app'));

    describe('ValidateHost service', function () {
        it('validates a host as valid', inject(function (ValidateHost) {
            var host = "google.com.br";
            var validated = ValidateHost.check(host);
            expect(validated).toBe(true);
        }));

        it('validates a host but domain is incomplete', inject(function (ValidateHost) {
            var host = "google";
            var validated = ValidateHost.check(host);
            expect(validated).toBe(false);
        }));

        it('validates a host but protocol is unnecessary', inject(function (ValidateHost) {
            var host = "http://google.com.br";
            var validated = ValidateHost.check(host);
            expect(validated).toBe(false);
        }));
    });
});
