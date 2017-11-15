

/**
 * The HTTP Service.
 *
 * An Angular Service wrapper atc as the HTTP Service facilitator
 * which exposes all HTTP methods such as GET, POST, PUT and DELETE.
 */
module.exports = function () {

        this.baseURL = 'http://localhost:2020';
        this.$get = function ($http) {

            var baseURL = this.baseURL;
            return {

                /**
                 *
                 * @param endpoint
                 * @param success
                 * @param failure
                 */
                get: function (endpoint, success, failure) {
                    $http.get(baseURL + endpoint).then(success, failure);
                },

                /**
                 *
                 * @param endpoint
                 * @param parms
                 * @param success
                 * @param failure
                 */
                getByParms: function (endpoint, parms, success, failure) {
                    $http.get(baseURL + endpoint, parms).then(success, failure);
                },

                /**
                 *
                 * @param endpoint
                 * @param data
                 * @param success
                 * @param failure
                 */
                create: function (endpoint, data, success, failure) {
                    $http.post(baseURL + endpoint, JSON.stringify(data)).then(success, failure);
                },

                /**
                 *
                 * @param url
                 * @param endpoint
                 * @param data
                 * @param success
                 * @param failure
                 */
                createRemote: function (remoteURL, endpoint, data, success, failure) {
                    $http.post(remoteURL + endpoint, JSON.stringify(data)).then(success, failure);
                },

                /**
                 *
                 * @param endpoint
                 * @param data
                 * @param success
                 * @param failure
                 */
                update: function (endpoint, data, success, failure) {
                    $http.put(baseURL + endpoint, JSON.stringify(data)).then(success, failure);
                },

                /**
                 *
                 * @param endpoint
                 * @param success
                 * @param failure
                 */
                delete: function (endpoint, success, failure) {
                    $http.delete(baseURL + endpoint).then(success, failure);
                },

                syncGet: function (endpoint, success, failure) {

                    $q.ajax({
                        type: 'GET',
                        url: baseURL + endpoint,
                        async: false,
                        success: function (response) {
                            success(response);
                        },
                        error: function (e) {
                            failure(e);
                        }
                    });
                }
            };
        };
        this.setBaseURL = function (baseURL) {
            this.baseURL = baseURL;
        };
    };