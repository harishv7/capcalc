var rows = [];
var moduleInfo = {};
var gradepoints = {
	"A+": 5.0,
	"A": 5.0,
	"A-": 4.5,
	"B+": 4.0,
	"B": 3.5,
	"B-": 3.0,
	"C+": 2.5,
	"C": 2.0,
	"D+": 1.5,
	"D": 1.0,
	"F": 0.0
}
var totalProduct = 0.0;
var sumOfModuleCredits = 0;

var Calc = React.createClass({
	getInitialState() {
		return {
			numOfModules: 0,
			cap: 0.0
		};
	},
	updateCap: function(cap) {
		this.setState({
			cap: cap
		});
	},
	render: function() {
		return(
			<div>
    			<div className="container">
      				<div className="header">
        				<h1 className="custom-heading">Welcome to CAP Calculator</h1>
        				<p className="custom-paragraph">This CAP calculator was built to help NUS students to monitor and calculate their CAP.</p>
      				</div>
      				<div className="row">
      					<div className="col-md-6">
      						<h1 className="cap-heading">Enter number of modules</h1>
      						<input onKeyUp={this.handleOnKeyUp}></input>
      						<i> (Press enter)</i>
      					</div>
      					<div className="col-md-4 text-center">
      						<h1 className="cap-heading">Your CAP</h1>
      						<span className="cap">{this.state.cap}</span>
      					</div>
      				</div>
    			</div>
    			<br/>
    			<hr/>
    			<br/>
    			<div className="container">
    				<div className="row">
    					<div className="col-xs-4 text-center">
    						<p>Module Code</p>
    					</div>
    					<div className="col-xs-4 text-center">
    						<p>Module Credits</p>
    					</div>
    					<div className="col-xs-4 text-center">
    						<p>Grade</p>
    					</div>
    				</div>
    			</div>
    			{<ModuleRows numOfModules={this.state.numOfModules} updateCap={this.updateCap} />}
			</div>
		);
	},
	handleOnKeyUp: function(event) {
		if (event.which === 13) {
			var input = event.target.value;
			console.log(input);

			// initialise moduleInfo
			for(var i = 0; i < input; i++) {
					moduleInfo[i] = {
						moduleName: "",
						moduleCredits: 0,
						moduleGrade: ""
				};
			}

			this.setState({
				numOfModules: input
			});
		}
	}
});

var ModuleRows = React.createClass({
	handleSubmit: function() {
		console.log("Submit pressed");
		totalProduct = 0.0;
		sumOfModuleCredits = 0;

		console.log("Printing Module Info");
		console.log(JSON.stringify(moduleInfo));

		for (var i=0; i < this.props.numOfModules; i++) {
			var grade = moduleInfo[i]["moduleGrade"];
			var credits = parseInt(moduleInfo[i]["moduleCredits"]);
			
			console.log("Grade " + grade);
			console.log("Credits " + credits);
			totalProduct += credits * gradepoints[grade];
			sumOfModuleCredits += credits;
		}
		console.log(totalProduct);
		console.log(sumOfModuleCredits);
		console.log(totalProduct/sumOfModuleCredits);

		var cap = totalProduct / sumOfModuleCredits;

		// save to local storage
		var newModuleInfo = moduleInfo;
    	var newModuleInfoString = JSON.stringify(moduleInfo);
    	localStorage.setItem("moduleInfo", newModuleInfoString);

		this.props.updateCap(cap);
	},
	handleChange: function(input, change, id) {
		id = parseInt(id);
		moduleInfo[id][change] = input;
	},
	render: function() {
		rows = [];
		for(var i=0; i < this.props.numOfModules; i++) {
		// 	moduleInfo[i] = {
		// 		moduleName: "",
		// 		moduleCredits: 0,
		// 		moduleGrade: ""
		// };
			rows.push(
				<ModuleItem handleChange={this.handleChange} id={i}/>
			);
			rows.push(<br/>)
		}
		return (
			<div>
				{rows}
				<hr/>
				<div className="row">
					<div className = "col-xs-3 text-center col-xs-offset-4">
						<button className="custom-btn" onMouseDown={this.handleSubmit}>Submit</button>
					</div>
				</div>
				<br/>
				<br/>
			</div>
		);
	}
});

var ModuleItem = React.createClass({
	changeModuleName: function(event) {
		this.props.handleChange(event.target.value, "moduleName", this.props.id);
	},
	changeModuleCredits: function(event) {
		this.props.handleChange(event.target.value, "moduleCredits", this.props.id);
	},
	changeGrade: function(event) {
		this.props.handleChange(event.target.value, "moduleGrade", this.props.id);
	},
	render: function() {
		return (
			<div>
				<div className="container">
					<div className="row">
						<div className="col-xs-4 text-center">
							<input onKeyUp={this.changeModuleName}></input>
						</div>
						<div className="col-xs-4 text-center">
							<input onKeyUp={this.changeModuleCredits}></input>
						</div>
						<div className="col-xs-4 text-center">
							<input onKeyUp={this.changeGrade}></input>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

ReactDOM.render(<Calc />, document.getElementById("app"));