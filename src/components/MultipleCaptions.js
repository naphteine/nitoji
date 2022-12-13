import React from "react";

const MultipleCaptions = () => {
  return (
    <>
      <h1>Toplu başlık açımı</h1>

      <table>
        <thead>
          <tr>
            <th>Başlık</th>
            <th>Okunuş</th>
            <th>Çeviri</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th>
              <input placeholder="Başlık" />
            </th>

            <th>
              <input placeholder="Okunuş" />
            </th>

            <th>
              <input placeholder="Çeviri" />
            </th>
          </tr>

          <tr>
            <th>
              <input placeholder="Başlık" />
            </th>

            <th>
              <input placeholder="Okunuş" />
            </th>

            <th>
              <input placeholder="Çeviri" />
            </th>
          </tr>

          <tr>
            <th>
              <input placeholder="Başlık" />
            </th>

            <th>
              <input placeholder="Okunuş" />
            </th>

            <th>
              <input placeholder="Çeviri" />
            </th>
          </tr>

          <tr>
            <th>
              <input placeholder="Başlık" />
            </th>

            <th>
              <input placeholder="Okunuş" />
            </th>

            <th>
              <input placeholder="Çeviri" />
            </th>
          </tr>

          <tr>
            <th>
              <input placeholder="Başlık" />
            </th>

            <th>
              <input placeholder="Okunuş" />
            </th>

            <th>
              <input placeholder="Çeviri" />
            </th>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default MultipleCaptions;
