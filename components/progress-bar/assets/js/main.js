var progress = {
    percentage: 0.0,

    start: function(query){
        this.percentage = 0.0;
        this.autoIncr(query);
    },

    done: function(){
        this.percentage = 1.0;
    },

    autoIncr: function(query){
        var ctr=0.0;
        var max=100;
        self = this;

        setInterval(function () {
            self.percentage = self.percentage + 0.01;
            
            ctr = self.percentage * max;
            
            if (ctr>=max){
                clearInterval();
                ctr = 100;
                self.done();
            }

            document.querySelector(query).style.width = ctr + "%";

        }, 200);
    }
};