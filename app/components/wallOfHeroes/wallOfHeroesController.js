(function () {
    'use strict';

    angular
        .module('wallOfHeroesModule', [])
        .controller('WallOfHeroesController', WallOfHeroesController);

    WallOfHeroesController.$inject = ['User'];

    /** @ngInject */
    function WallOfHeroesController(User) {
        var badgeNames = ['Brilliant!', 'Exceptional!', 'Innovative', 'Committed', 'Skillful', 'Resourceful', 'Timesaver', 'Lifesaver'];
		var badgesImagePath = ['assets/images/hero_badge_brilliant.png', 'assets/images/hero_badge_exceptional.png', 'assets/images/hero_badge_innovative.png',
			'assets/images/hero_badge_committed.png', 'assets/images/hero_badge_skillful.png', 'assets/images/hero_badge_resourceful.png',
			'assets/images/hero_badge_timesaver.png', 'assets/images/hero_badge_lifesaver.png',
		];

        var vm = this;

        vm.badges = [];

        init();

        function init() {
            loadBadges();
        }


        function loadBadges() {
            User.getAllUsers().then(function (response) {

                angular.forEach(response.data, function (userObj, userKey) {
                    angular.forEach(userObj.badges, function (badgeObj, badgeKey) {
                        var badgeIndex = getBadgeIndex(badgeObj.name);
                        if (badgeIndex < 0){
                            badgeIndex = 0;
                        }
                        var badge = {
                            name: badgeObj.name,
                            date: new Date(badgeObj.date),
                            initiator: badgeObj.initiator,
                            to: userObj.username,
                            imagePath: badgesImagePath[badgeIndex]
                        };
                        vm.badges.push(badge);
                    });
                });
                
            }).catch(function (error) {
                console.log('error getting user list');
            });
        }

        function getBadgeIndex(badgeName) {
			for (var i = 0; i < badgeNames.length; i++) {
				if (badgeNames[i] == badgeName) {
					return i;
				}
			}
			return -1;
		}

    }

} ());