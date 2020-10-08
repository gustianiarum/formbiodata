package id.gustiani.formbiodata.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import id.gustiani.formbiodata.model.dto.PendidikanDto;
import id.gustiani.formbiodata.model.dto.StatusDto;
import id.gustiani.formbiodata.service.PersonService;
import id.gustiani.formbiodata.service.PersonServiceImpl;

@RestController
@RequestMapping("/pendidikan")
@CrossOrigin(origins = "http://localhost:3001")
public class PendidikanController {

	@Autowired
	private PersonService personService = new PersonServiceImpl();

	// http://localhost:8080/pendidikan/person/1
	/* Insert Data Pendidikan */
	@PostMapping("/person/{idPerson}")
	public StatusDto insertPendidikan(@PathVariable Integer idPerson, @RequestBody List<PendidikanDto> pendidikanDto) {
		StatusDto statusDto = new StatusDto();
		try {
			personService.insertPendidikan(idPerson, pendidikanDto);
			statusDto.setStatus("true");
			statusDto.setMessage("data berhasil masuk");
		} catch (Exception e) {
			statusDto.setStatus("false");
			statusDto.setMessage("data gagal masuk");
		}
		return statusDto;
	}

}
