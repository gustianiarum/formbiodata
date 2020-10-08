package id.gustiani.formbiodata.controller;

import java.time.Year;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import id.gustiani.formbiodata.model.dto.FullDto;
import id.gustiani.formbiodata.model.dto.PendidikanDto;
import id.gustiani.formbiodata.model.dto.PersonDto;
import id.gustiani.formbiodata.model.dto.StatusDto;
import id.gustiani.formbiodata.model.dto.StatusDto2;
import id.gustiani.formbiodata.model.entity.Biodata;
import id.gustiani.formbiodata.model.entity.Person;
import id.gustiani.formbiodata.model.entity.Pendidikan;
import id.gustiani.formbiodata.repository.BiodataRepository;
import id.gustiani.formbiodata.repository.PendidikanRepository;
import id.gustiani.formbiodata.repository.PersonRepository;
import id.gustiani.formbiodata.service.PersonService;

@RestController
@RequestMapping("/person")
@CrossOrigin(origins = "http://localhost:3001")
public class PersonController {

	private final PersonRepository personRepository;
	private final BiodataRepository biodataRepository;
	private final PendidikanRepository pendidikanRepository;

	@Autowired
	private PersonService personService;

	@Autowired
	private ModelMapper modelmapper;

	@Autowired
	public PersonController(PersonRepository personRepository, BiodataRepository biodataRepository,
			PendidikanRepository pendidikanRepository) {
		this.personRepository = personRepository;
		this.biodataRepository = biodataRepository;
		this.pendidikanRepository = pendidikanRepository;
	}

	// http://localhost:8080/person
	/* Insert Data Person */
	@PostMapping
	public StatusDto insert(@RequestBody PersonDto personDto) {
		return personService.insertPerson(personDto);
	}

	@GetMapping
	public List<PersonDto> getListBiodata() {
		List<Biodata> personList = biodataRepository.findAll();
		List<PersonDto> personDto = personList.stream().map(biodata -> mapDataToDataDto(biodata))
				.collect(Collectors.toList());
		return personDto;
	}

	@GetMapping("/allpendidikan")
	public List<PendidikanDto> getAllPendidikan() {
		List<Pendidikan> pdt = pendidikanRepository.findAll();
		List<PendidikanDto> pdto = pdt.stream().map(pendidikan -> convertPendidikan(pendidikan))
				.collect(Collectors.toList());
		return pdto;
	}

	private PendidikanDto convertPendidikan(Pendidikan pendidikan) {
		PendidikanDto pdto = modelmapper.map(pendidikan, PendidikanDto.class);
		modelmapper.map(pendidikan.getPerson(), pdto);
		return pdto;
	}

	private PersonDto mapDataToDataDto(Biodata biodata) {
		PersonDto personDto = modelmapper.map(biodata, PersonDto.class);
		modelmapper.map(biodata.getPerson(), personDto);
		return personDto;
	}

	@GetMapping("/pendidikan")
	public List<FullDto> get() {
		List<Biodata> biodataList = biodataRepository.findAll();
		List<FullDto> fullDto = biodataList.stream().map(biodata -> mapFullDto(biodata)).collect(Collectors.toList());
		return fullDto;
	}

	@DeleteMapping("/delete/{idPerson}")
	public StatusDto deleteData(@PathVariable Integer idPerson) {
		return personService.deleteData(idPerson);
	}

	@PutMapping("/{idPerson}")
	public StatusDto updateData(@RequestBody PersonDto newPerson, @PathVariable Integer idPerson) {
		return personService.updateData(newPerson, idPerson);
	}

	private FullDto mapFullDto(Biodata biodata) {

		FullDto fullDto = new FullDto();

		Calendar calendar = Calendar.getInstance();
		calendar.setTime(biodata.getTgl());
		Integer usia = Year.now().getValue() - calendar.get(Calendar.YEAR);

		fullDto.setNik(biodata.getPerson().getNik());
		fullDto.setName(biodata.getPerson().getName());
		fullDto.setAddress(biodata.getPerson().getAddress());
		fullDto.setHp(biodata.getHp());
		fullDto.setTgl(biodata.getTgl());
		fullDto.setTempatLahir(biodata.getTempatLahir());
		fullDto.setUmur(Integer.toString(usia));
		fullDto.setPendidikan_terakhir(pendidikanRepository.lastJenjang(biodata.getPerson().getIdPerson()));
		return fullDto;
	}

	// http://localhost:8080/person/pendidikan/1212121212121212
	@GetMapping("/pendidikan/{nik}")
	public List<Object> get(@PathVariable String nik) {
		List<Object> status = new ArrayList<>();
		StatusDto statusDto = new StatusDto();
		StatusDto2 statusDto2 = new StatusDto2();
		if (nik.length() == 16) {
			if (!(personRepository.findByNik(nik).isEmpty())) {
				FullDto fullDto = convertToDto(nik);
				statusDto2.setStatus("true");
				statusDto2.setMessage("success");
				statusDto2.setFullDto(fullDto);
				status.add(statusDto2);
			} else {
				statusDto.setStatus("true");
				statusDto.setMessage("data dengan nik " + nik + " tidak ditemukan");
				status.add(statusDto);
			}
		} else {
			statusDto.setStatus("false");
			statusDto.setMessage("data gagal masuk, jumlah digit nik tidak sama dengan 16");
			status.add(statusDto);
		}
		return status;
	}

	private FullDto convertToDto(String nik) {
		FullDto fullDto = new FullDto();
		Person person = personRepository.findByNik(nik).get(0);
		Biodata biodata = biodataRepository.findAllByPersonIdPerson(person.getIdPerson());

		Calendar calendar = Calendar.getInstance();
		calendar.setTime(biodata.getTgl());

		fullDto.setNik(biodata.getPerson().getNik());
		fullDto.setName(biodata.getPerson().getName());
		fullDto.setAddress(biodata.getPerson().getAddress());
		fullDto.setHp(biodata.getHp());
		fullDto.setTgl(biodata.getTgl());
		fullDto.setTempatLahir(biodata.getTempatLahir());
		fullDto.setUmur(String.valueOf(Year.now().getValue() - calendar.get(Calendar.YEAR)));
		fullDto.setPendidikan_terakhir(pendidikanRepository.lastJenjang(biodata.getPerson().getIdPerson()));
		return fullDto;
	}

	@GetMapping("/{idPerson}")
	public PersonDto getBiodata(@PathVariable Integer idPerson) {
		Biodata biodata = biodataRepository.findAllByPersonIdPerson(idPerson);
		PersonDto personDto = new PersonDto();
		// jika tidak pakai model mapper maka perlu setter getter satu satu
		personDto.setIdPerson(biodata.getPerson().getIdPerson());
		personDto.setIdBio(biodata.getIdBio());
		personDto.setNik(biodata.getPerson().getNik());
		personDto.setName(biodata.getPerson().getName());
		personDto.setAddress(biodata.getPerson().getAddress());
		personDto.setHp(biodata.getHp());
		personDto.setTempatLahir(biodata.getTempatLahir());
		personDto.setTgl(biodata.getTgl());
		return personDto;
	}

}
