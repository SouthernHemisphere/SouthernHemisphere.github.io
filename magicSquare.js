var magicSquareApp = {
    init: function() {
        Plotly.newPlot('magicSquare', [{
            x: [1, 1, 1, 0, 0, 0 , -1, -1, -1],
            y: [1, 0, -1, 1, 0, -1, 1, 0, -1],
            marker:{size:30,
                    color: '#B4EEB4',
                    symbol: "square"},
            text: ["6", "1", "8", "7", "5", "3", "2", "9", "4"],
            mode: 'markers+text'
        }], {
            xaxis: {range: [-3,3],
                showgrid: false,
                zeroline: false,
                showline: false,
                autotick: true,
                ticks: '',
                showticklabels: false},
            yaxis: {range: [-3,3],
                showgrid: false,
                zeroline: false,
                showline: false,
                autotick: true,
                ticks: '',
                showticklabels: false}
        });

        $("#toggleMagicSquare").click($.proxy(this.animateShuffle, this));
    },

    animateShuffle: function() {
        var data;
        if (this.toggle) {
            data = [{x: [1, 1, 1, 0, 0, 0 , -1, -1, -1],
                y: [1, 0, -1, 1, 0, -1, 1, 0, -1]}];
        } else {
            data = [{x: [1, -2, 1, 0, 0, 0 , -1, 2, -1],
                y: [1, 0, -1, -2, 0, 2, 1, 0, -1]}];
        }
        Plotly.animate('magicSquare', [{
            data: data
        }]);
        this.toggle = !this.toggle;
    },

    toggle: false
}

magicSquareApp.init();
