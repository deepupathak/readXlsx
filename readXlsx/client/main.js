import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

/*import 'jszip';
// import xlsx from 'xlsx';
require('xlsx-browserify-shim');*/
// var xlsx = require('node-xlsx').default;

Template.hello.onCreated(function helloOnCreated() {

});

Template.hello.helpers({
  
});

Template.hello.events({
  'change .importCSV'(event, instance) {
		const file = event.currentTarget.files[0];
		// console.log("------", workSheetsFromFile)
		const reader = new FileReader();
		// require('jszip');
		// let xlsx = require('xlsx');
		// let xlsxj = require("xlsx-to-json");

		let fileData;
		reader.onload = (e) => {
			// console.log("XLSX =>", xlsx)
			const { Sheets } = XLSX.read(e.target.result, {type: 'binary'});
			const sheetList = Object.keys(Sheets);
			// console.log(Sheets, sheetList)
			const columns = [
				{ col: 'A', key: 'sid' }, 
				{ col: 'B', key: 'name' }, 
				{ col: 'C', key: 'address' }, 
				{ col: 'D', key: 'city' }, 
				{ col: 'E', key: 'state' }, 
				{ col: 'F', key: 'zip' },
				{ col: 'G', key: 'lat' }, 
				{ col: 'H', key: 'long' },
				{ col: 'I', key: 'zipMatch' },
			];
			let data = []
			sheetList.forEach((s) => {
				const currentSheet = Sheets[s];
				const range = currentSheet['!ref'].split(':');
				const start = Number(range[0].match(/\d/g).join(''));
				const end = Number(range[1].match(/\d/g).join(''));
				columns.forEach((c) => {
					for(i = start + 2, j = 0; i <= end; i++, j++) {
						if(c.col == `A`){
							data.push({ [`${c.key}`]: currentSheet[`${c.col}${i}`].v });
						} else if(c.col == `I`){
							data[j][`${c.key}`] = currentSheet[`${c.col}${i}`].v.split(',');
						} else {
							data[j][`${c.key}`] = currentSheet[`${c.col}${i}`].v;
						}
					}
				});
			});
			console.log("D A T A =>", data);
  	}
  	reader.readAsBinaryString(file);
  }
});