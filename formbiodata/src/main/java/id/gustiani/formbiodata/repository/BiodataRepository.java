package id.gustiani.formbiodata.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import id.gustiani.formbiodata.model.entity.Biodata;


@Repository
public interface BiodataRepository extends JpaRepository<Biodata, Integer> {

	Biodata findAllByPersonIdPerson(Integer idPerson);
	
}