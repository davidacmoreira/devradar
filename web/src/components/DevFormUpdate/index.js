import React, { useState } from 'react';

import './styles.css';


function DevFormUpdate({ onSubmit, idDevEdit, bioDevEdit, techsDevEdit }) {
  const [bio, setBio] = useState(bioDevEdit);
  const [techs, setTechs] = useState(techsDevEdit);

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({
      github_username: idDevEdit,
      bio,
      techs
    });
  };

  return (
      <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label>github_username</label>
            <input name="github_username" id="github_username" value={idDevEdit} readOnly />
          </div>

          <div className="input-block">
            <label>bio</label>
            <input name="bio" id="bio" value={bio} onChange={e => setBio(e.target.value)} />
          </div>

          <div className="input-block">
            <label>techs</label>
            <input name="techs" id="techs" value={techs} onChange={e => setTechs(e.target.value)} />
          </div>

          <button type="submit">save</button>
      </form>
  );
};

export default DevFormUpdate;