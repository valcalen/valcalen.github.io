let faecher = {
	"mathe": {
		"name":		"Mathematik",
		"kurs":		"MA2 (Ab)",
		"farbe":	"#e76f51",
	},
	"info": {
		"name":		"Informatik",
		"kurs":		"IF1 (Sas)",
		"farbe":	"#f9d46a",
	},
	"physik": {
		"name":		"Physik",
		"kurs":		"PH1 (Bu)",
		"farbe":	"#f4a261",
	},
	"englisch": {
		"name":		"Englisch",
		"kurs":		"en4 (Mul)",
		"farbe":	"#3aad9f",
	},
	"religion": {
		"name":		"Religion",
		"kurs":		"re2 (Nöt)",
		"farbe":	"#8ab17d",
	},
	"deutsch": {
		"name":		"Deutsch",
		"kurs":		"de3 (Bl)",
		"farbe":	"#eee",
	},
	"geschichte": {
		"name":		"Geschichte",
		"kurs":		"ge3 (Slz)",
		"farbe":	"#eee",
	},
	"powi": {
		"name":		"PoWi",
		"kurs":		"pw2 (Lau)",
		"farbe":	"#eee",
	},
	"kunst": {
		"name":		"Kunst",
		"kurs":		"",
		"farbe":	"#eee",
	},
	"sport": {
		"name":		"Sport (???)",
		"kurs":		"",
		"farbe":	"#fff",
	},
	"seminarfach": {
		"name":		"Seminarfach",
		"kurs":		"",
		"farbe":	"#e0d29f",
	},
	"mittagspause": {
		"name":		"Mittagspause",
		"kurs":		"",
		"farbe":	"#fff",
	},
}

function faecherLaden () {
	for (let fach_id in faecher) {
		let fach_elements = document.getElementsByClassName(fach_id)

		for (let fach_elem of fach_elements) {
			let fach = faecher[fach_id];

			fach_elem.style.backgroundColor = fach["farbe"];
			fach_elem.innerHTML =
				`<p><b>${fach["name"]}</b></p>
				<p>${fach["kurs"]}</p>
				<p><i>` + fach_elem.innerHTML + `</i></p>`
		}
	}
}

