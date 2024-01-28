# Interactsh Client Server

This Node.js server interacts with the `interactsh-client` to fetch and filter interactions.

## Getting Started

### Prerequisites

- Node.js installed on your machine
- `interactsh-client` installed (`go install -v github.com/projectdiscovery/interactsh/cmd/interactsh-client@latest`)

### Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/rahul-github-account-1/Project
    cd Project
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the server:

    ```bash
    node app.js
    ```

    The server will be running on http://localhost:3000 by default.

## API Endpoints

### 1. Get Interactsh URL

- **Endpoint**: `/api/getURL`
- **Method**: GET
- **Description**: Retrieves the current interactsh URL used by the `interactsh-client`.
- **Response Example**:

    ```json
    {
      "url": "cmr87qn2iceg506r9t60o4xkdpmh84tx4.oast.me"
    }
    ```
### 2. Open a terminal and have some interactions with the test-server url by using ping and curl
- **Do DNS interaction**: `ping cmr87qn2iceg506r9t60o4xkdpmh84tx4.oast.me`
- **Do HTTP interaction**:`curl cmr87qn2iceg506r9t60o4xkdpmh84tx4.oast.me`
- In this way, we can interact with test-server and we can get all these interactions by hitting Get Interaction API


### 3. Get Interactions

- **Endpoint**: `/api/getInteractions`
- **Method**: POST
- **Description**: Retrieves interactions based on the provided URL, start timestamp, and end timestamp.
- **Request Example**:

    ```json
    {
      "url": "cmr87qn2iceg506r9t60o4xkdpmh84tx4.oast.me",
      "start": "",
      "end": ""
    }
    ```

- **Response Example**:

    ```json
  [
      {
          "2024-01-28 16:50:25": "[Cmr87Qn2IcEG506R9t60o4XkDpMh84tX4] Received DNS interaction (A) from 112.110.126.195 at 2024-01-28 16:50:25"
      },
      {
          "2024-01-28 16:50:25": "[cMr87QN2icEg506R9T60O4xkdpmH84TX4] Received DNS interaction (A) from 112.110.126.195 at 2024-01-28 16:50:25"
      },
      {
          "2024-01-28 16:50:25": "[Cmr87QN2IcEg506r9t60o4XkdPMh84tx4] Received DNS interaction (A) from 112.110.126.195 at 2024-01-28 16:50:25"
      },
      {
          "2024-01-28 16:50:25": "[cMr87Qn2icEg506r9T60O4XkdPMh84TX4] Received DNS interaction (A) from 112.110.126.195 at 2024-01-28 16:50:25"
      },
      {
          "2024-01-28 16:50:25": "[CMr87qN2IcEg506r9t60O4Xkdpmh84Tx4] Received DNS interaction (AAAA) from 112.110.126.195 at 2024-01-28 16:50:25"
      },
      {
          "2024-01-28 16:50:25": "[CmR87QN2icEG506r9T60o4Xkdpmh84tx4] Received DNS interaction (AAAA) from 112.110.126.195 at 2024-01-28 16:50:25"
      },
      {
          "2024-01-28 16:50:25": "[cmR87qN2ICeG506R9t60O4XkDPMh84TX4] Received DNS interaction (AAAA) from 112.110.126.195 at 2024-01-28 16:50:25"
      },
      {
          "2024-01-28 16:50:25": "[CMr87Qn2iceG506r9T60o4xkdPMH84tX4] Received DNS interaction (AAAA) from 112.110.126.195 at 2024-01-28 16:50:25"
      },
      {
          "2024-01-28 16:50:25": "[cmR87QN2iceg506r9t60O4XKDPmH84tx4] Received DNS interaction (A) from 112.110.126.195 at 2024-01-28 16:50:25"
      },
      {
          "2024-01-28 16:50:26": "[cmr87qN2iCEG506r9t60o4xKDpmH84tX4] Received DNS interaction (A) from 112.110.126.195 at 2024-01-28 16:50:26"
      },
      {
          "2024-01-28 16:51:41": "[cmr87qn2iceg506r9t60o4xkdpmh84tx4] Received HTTP interaction from 1.187.220.60 at 2024-01-28 16:51:41"
      }
  ]
    ```
  - **We can also specify the start and end time stamps in request body to get specific interactions within a time window**:
     ```json
     {
        "url":"cmr87qn2iceg506r9t60o4xkdpmh84tx4.oast.me",
        "start":"2024-01-28 16:51:41",
        "end":"2024-01-28 16:56:53"
     }    

    ```
  - **Resonse we get now is**
      ```json
      [
        {
            "2024-01-28 16:51:41": "[cmr87qn2iceg506r9t60o4xkdpmh84tx4] Received HTTP interaction from 1.187.220.60 at 2024-01-28 16:51:41"
        },
        {
            "2024-01-28 16:56:53": "[cmr87qn2iceg506r9t60o4xkdpmh84tx4] Received HTTP interaction from 1.187.220.60 at 2024-01-28 16:56:53"
        }
      ]


      ```
       

