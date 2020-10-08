package id.gustiani.formbiodata.service;

import java.util.List;

import id.gustiani.formbiodata.model.dto.PendidikanDto;
import id.gustiani.formbiodata.model.dto.PersonDto;
import id.gustiani.formbiodata.model.dto.StatusDto;
import id.gustiani.formbiodata.model.entity.Pendidikan;

public interface PersonService {
	StatusDto insertPerson(PersonDto personDto);

	void insertPendidikan(Integer idPerson, List<PendidikanDto> pendidikanDto);

	Pendidikan convertToPendidikanEntity(PendidikanDto pendidikanDto, Integer idPerson);

	StatusDto deleteData(Integer idPerson);

	StatusDto updateData(PersonDto newPerson, Integer idPerson);
}
