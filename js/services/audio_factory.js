app.factory('audioFactory', function(){
    var factory = {
        accessKeyId : 'AKIAIPZRW7JGN5EQM3QA',
        secretAccessKey: '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',
        soundLoaded: false,
        playSound : function(card_id){
            AWS.config.update({accessKeyId: factory.accessKeyId, secretAccessKey: factory.secretAccessKey});
            var params = {
                Bucket: 'word-audio', // required
                Key: '78.mp3' // required
            }
            new AWS.S3().getSignedUrl('getObject', params, function (err, url) {
                var mySound = soundManager.createSound({
                    url: url
                });
                mySound.play({
                    onload: function() {
                        console.log("Je passe à true !")
                        factory.soundLoaded = true;
                        factory.getSoundLoaded();
                    }
                });
            });
        },
        getSoundLoaded : function(){
            return factory.soundLoaded;
        }
    }
    return factory;
});
