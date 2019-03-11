;(function($, window, undefined){

	/**
	 * Small pie chart
	 * @type object
	 */
	var $smallPieChart = $('.small-pie-chart');


	/**
	 * Set all small pie charts
	 * @param callback
	 * @return void
	 */
	$smallPieChart.each(function(){
		var $this = $(this);
		var params = { 
			value : $this.attr('data-chart-percentage'),  
			color: "#660032"
		};

		//$this.drawDoughnutChart(params);
	});


})(jQuery);