package id.gustiani.formbiodata.model.dto;

public class PendidikanDto {
	private String jenjang;
	private String institusi;
	private String masuk;
	private String lulus;
	private Integer idPerson;
	private Integer idPendidikan;

	public String getJenjang() {
		return jenjang;
	}

	public void setJenjang(String jenjang) {
		this.jenjang = jenjang;
	}

	public String getInstitusi() {
		return institusi;
	}

	public void setInstitusi(String institusi) {
		this.institusi = institusi;
	}

	public String getMasuk() {
		return masuk;
	}

	public void setMasuk(String masuk) {
		this.masuk = masuk;
	}

	public String getLulus() {
		return lulus;
	}

	public void setLulus(String lulus) {
		this.lulus = lulus;
	}

	public Integer getIdPerson() {
		return idPerson;
	}

	public void setIdPerson(Integer idPerson) {
		this.idPerson = idPerson;
	}

	public Integer getIdPendidikan() {
		return idPendidikan;
	}

	public void setIdPendidikan(Integer idPendidikan) {
		this.idPendidikan = idPendidikan;
	}

}
