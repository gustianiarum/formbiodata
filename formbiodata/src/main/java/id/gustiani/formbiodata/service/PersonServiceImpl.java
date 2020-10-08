package id.gustiani.formbiodata.service;

import java.time.LocalDate;
import java.time.Period;
import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import id.gustiani.formbiodata.model.dto.PendidikanDto;
import id.gustiani.formbiodata.model.dto.PersonDto;
import id.gustiani.formbiodata.model.dto.StatusDto;
import id.gustiani.formbiodata.model.entity.Biodata;
import id.gustiani.formbiodata.model.entity.Pendidikan;
import id.gustiani.formbiodata.model.entity.Person;
import id.gustiani.formbiodata.repository.BiodataRepository;
import id.gustiani.formbiodata.repository.PendidikanRepository;
import id.gustiani.formbiodata.repository.PersonRepository;

@Service
@Transactional
public class PersonServiceImpl implements PersonService {

	@Autowired
	private PersonRepository personRepository;

	@Autowired
	private BiodataRepository biodataRepository;

	@Autowired
	private PendidikanRepository pendidikanRepository;

	@Autowired
	private ModelMapper modelmapper;

	@Override
	public StatusDto insertPerson(PersonDto personDto) {
		StatusDto statusDto = new StatusDto();
		Date dob = personDto.getTgl();
		LocalDate birth = dob.toLocalDate();
		LocalDate now = LocalDate.now();
		Period usia = Period.between(birth, now);
		if (usia.getYears() < 30 && personDto.getNik().length() != 16) {
			statusDto.setStatus("false");
			statusDto.setMessage(
					"data gagal masuk, umur kurang dari 30 tahun dan jumlah digit nik tidak sama dengan 16");
		} else if (usia.getYears() < 30) {
			statusDto.setStatus("false");
			statusDto.setMessage("data gagal masuk, umur kurang dari 30 tahun");
		} else if (personDto.getNik().length() != 16) {
			statusDto.setStatus("false");
			statusDto.setMessage("jumlah digit nik tidak sama dengan 16");
		} else {
			Person person = modelmapper.map(personDto, Person.class);
			Biodata biodata = modelmapper.map(personDto, Biodata.class);
			biodata.setPerson(person);
			personRepository.save(person);
			biodataRepository.save(biodata);
			statusDto.setStatus("true");
			statusDto.setMessage("data berhasil masuk");
		}
		return statusDto;
	}

	@Override
	public void insertPendidikan(Integer idPerson, List<PendidikanDto> pendidikanDto) {
		if (personRepository.findById(idPerson).isPresent()) {
			List<Pendidikan> pendidikan = pendidikanDto.stream().map(x -> convertToPendidikanEntity(x, idPerson))
					.collect(Collectors.toList());
			pendidikan.forEach(y -> pendidikanRepository.save(y));
		}
	}

	@Override
	public StatusDto deleteData(Integer idPerson) {
		StatusDto statusDto = new StatusDto();
		Biodata biodata = biodataRepository.findAllByPersonIdPerson(idPerson);
		biodataRepository.deleteById(biodata.getIdBio());
		List<Pendidikan> pendidikan = pendidikanRepository.findAllByPersonIdPerson(idPerson);
		for (int i = 0; i < pendidikan.size(); i++) {
			pendidikanRepository.deleteById(pendidikan.get(i).getIdPendidikan());
		}
		personRepository.deleteById(idPerson);
		if (personRepository.findById(idPerson).isPresent() == false
				&& biodataRepository.findAllByPersonIdPerson(idPerson) == null
				&& pendidikanRepository.findAllByPersonIdPerson(idPerson).isEmpty()) {
			statusDto.setStatus("true");
			statusDto.setMessage("data berhasil dihapus");
		} else {
			statusDto.setStatus("false");
			statusDto.setMessage("data gagal dihapus");
		}
		return statusDto;
	}

	@Override
	public StatusDto updateData(PersonDto newPerson, Integer idPerson) {
		StatusDto statusDto = new StatusDto();
		Person person = personRepository.findById(idPerson).get();
		Biodata biodata = biodataRepository.findAllByPersonIdPerson(idPerson);
		person.setNik(newPerson.getNik());
		person.setName(newPerson.getName());
		person.setAddress(newPerson.getAddress());
		biodata.setHp(newPerson.getHp());
		biodata.setTgl(newPerson.getTgl());
		biodata.setTempatLahir(newPerson.getTempatLahir());
		personRepository.save(person);
		biodataRepository.save(biodata);
		if (person.getNik().equals(newPerson.getNik()) && person.getName().equals(newPerson.getName())
				&& person.getAddress().equals(newPerson.getAddress()) && biodata.getHp().equals(newPerson.getHp())
				&& biodata.getTgl().equals(newPerson.getTgl())
				&& biodata.getTempatLahir().equals(newPerson.getTempatLahir())) {
			statusDto.setStatus("true");
			statusDto.setMessage("data berhasil diubah");
		} else {
			statusDto.setStatus("false");
			statusDto.setMessage("perubahan data gagal");
		}
		return statusDto;
	}

	public Pendidikan convertToPendidikanEntity(PendidikanDto pendidikanDto, Integer idPerson) {
		Pendidikan pendidikan = new Pendidikan();
		pendidikan.setJenjang(pendidikanDto.getJenjang());
		pendidikan.setInstitusi(pendidikanDto.getInstitusi());
		pendidikan.setThMasuk(pendidikanDto.getMasuk());
		pendidikan.setThLulus(pendidikanDto.getLulus());
		if (personRepository.findById(idPerson).isPresent()) {
			Person person = personRepository.findById(idPerson).get();
			pendidikan.setPerson(person);
		}
		return pendidikan;
	}

}
