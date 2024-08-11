const
	LK1 = "#e76f51", LK2 = "#f9d46a", LK3 = "#f4a261",
	GK1 = "#3aad9f", GK2 = "#8ab17d",
	SF = "#e0d29f", DFLT = "#eee"


let faecher = {
	"mathe": {
		"name":		"Mathematik",
		"kurs":		"MA2 (Ab)",
		"farbe":	LK1,
	},
	"info": {
		"name":		"Informatik",
		"kurs":		"IF1 (Sas)",
		"farbe":	LK2,
	},
	"physik": {
		"name":		"Physik",
		"kurs":		"PH1 (Bu)",
		"farbe":	LK3,
	},
	"englisch": {
		"name":		"Englisch",
		"kurs":		"en4 (Mul)",
		"farbe":	GK1,
	},
	"religion": {
		"name":		"Religion",
		"kurs":		"re2 (Nöt)",
		"farbe":	GK2,
	},
	"deutsch": {
		"name":		"Deutsch",
		"kurs":		"de3 (Bl)",
		"farbe":	DFLT,
	},
	"geschichte": {
		"name":		"Geschichte",
		"kurs":		"ge3 (Slz)",
		"farbe":	DFLT,
	},
	"powi": {
		"name":		"PoWi",
		"kurs":		"pw2 (Lau)",
		"farbe":	DFLT,
	},
	"kunst": {
		"name":		"Kunst",
		"kurs":		"",
		"farbe":	DFLT,
	},
	"sport": {
		"name":		"Sport",
		"kurs":		"sp2 (Hl)",
		"farbe":	DFLT,
	},
	"seminarfach": {
		"name":		"Seminarfach",
		"kurs":		"sf4 (Smk)",
		"farbe":	SF,
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

