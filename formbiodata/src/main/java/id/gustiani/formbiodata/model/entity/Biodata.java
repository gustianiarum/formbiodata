package id.gustiani.formbiodata.model.entity;

import java.sql.Date;
import javax.persistence.*;

@Entity
@Table(name = "t_biodata")
public class Biodata {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_bio")
	private Integer idBio;

	@Column(name = "nohp", length = 16)
	private String hp;
	
	@Column(name = "tanggal_lahir", nullable = false)
	private Date tgl;

	@Column(name = "tempat_lahir", length = 50)
	private String tempatLahir;

	@OneToOne
	@JoinColumn(name = "idPerson", unique = true, nullable = false)
	private Person person;

	public Integer getIdBio() {
		return idBio;
	}

	public void setIdBio(Integer idBio) {
		this.idBio = idBio;
	}

	public String getHp() {
		return hp;
	}

	public void setHp(String hp) {
		this.hp = hp;
	}

	public Date getTgl() {
		return tgl;
	}

	public void setTgl(java.sql.Date tgl) {
		this.tgl = tgl;
	}

	public String getTempatLahir() {
		return tempatLahir;
	}

	public void setTempatLahir(String tempatLahir) {
		this.tempatLahir = tempatLahir;
	}

	public Person getPerson() {
		return person;
	}

	public void setPerson(Person person) {
		this.person = person;
	}

}
