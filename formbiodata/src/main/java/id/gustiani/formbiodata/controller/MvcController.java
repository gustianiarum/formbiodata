package id.gustiani.formbiodata.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// //import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

// import id.gustiani.formbiodata.service.PersonService;

//import com.arisya.spring.model.dto.FormDto;
//import com.arisya.spring.service.FormService;

@Controller
public class MvcController {

	// @Autowired
	// private PersonService personService;

	@GetMapping("/base")
	public String base(Model model) {
		return "base";
	}

	@GetMapping("/base/index1")
	public String IndexOne(Model model) {
		return "biodata/index1";
	}

	@GetMapping("/base/index2")
	public String IndexTwo(Model model) {
		return "biodata/index2";
	}

	@GetMapping("/base/index3")
	public String IndexThree(Model model) {
		return "biodata/index3";
	}

	@GetMapping("/base/index4")
	public String IndexFour(Model model) {
		return "biodata/index4";
	}

	// @GetMapping("/base/index5")
	// public String IndexFive(Model model) {
	// return "biodata/index5";
	// }
	@GetMapping("/base/index5")
	public String IndexFive(Model model) {
		return "biodata/index5";
	}

	@GetMapping("/base/index6/{idPerson}")
	public String doTambahDetail(Model model, @PathVariable Integer idPerson) {
		model.addAttribute("idPerson", idPerson);
		return "biodata/index6";
	}

	// @PostMapping ("/tambahdetailbarang")
	// public String doTambah(@ModelAttribute("pendidikan") PersonDto personDto,
	// Integer idPerson) {
	// personDto.setIdPerson(idPerson);
	// return "redirect:/tampilan";
	// }

}
