describe('Finding IP App', function () {

    beforeEach(module('app'));

    describe('IpApi service', function () {
        it('should demonstrate a successfully request', inject(function ($httpBackend, IpApi, CONSTANTS) {
            var location = {};
            IpApi.get()
                .then(function (response) {
                    location = response.data;
                });

            /*Mock response*/
            var data = {
                'query': '192.168.0.1',
                "country": "Brazil",
                "regionName": "Minas Gerais",
                "city": "Belo Horizonte",
                "timezone": 'America/Sao_Paulo',
                "lat": '-19.9553',
                "lon": '-43.8988'
            };
            $httpBackend
                .when('GET', CONSTANTS.IP_API_URL)
                .respond(200, data);

            $httpBackend.flush();
            expect(location).toEqual(data);

        }));
    });
});
