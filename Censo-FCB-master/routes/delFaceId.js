const subscriptionKey = process.env.SUBSCRIPTIONKEY; //flag
const personGroupId = process.env.PERSONGROUPID;
const url = process.env.URL;
const request = require('request');
const rp = require('request-promise');
const { dbUsers } = require('../db/config_db');

async function delFaceId(id) {
	dbUsers
		.query({ _id: id })
		.then(doc => {
			if (!doc[0].PERSONID) {
				console.log('doc[0].PERSONID no existe');
			} else {
				let gUriBase = url + `${personGroupId}/persons/${doc[0].PERSONID}`;

				let params = {
					personGroupId: personGroupId
				};

				let options = {
					uri: gUriBase,
					qs: params,
					headers: {
						'Content-Type': 'appiclation/json',
						'Ocp-Apim-Subscription-Key': subscriptionKey
					}
				};

				// async function(){}
				var max = 0;
				var cnt = 0;

				rp(options)
					.then(async function (data) {
						if (data) {
							let persistedFaceIds = JSON.parse(data).persistedFaceIds;
							persistedFaceIds.forEach(persistedFaceId => {
								let uriBase = url + `${personGroupId}/persons/${doc[0].PERSONID}/persistedFaces/${persistedFaceId}`;
								let params = {
									personGroupId: personGroupId
								};
								let options = {
									url: uriBase,
									method: 'DELETE',
									qs: params,
									headers: {
										'Content-type': 'application/octet-stream',
										'Ocp-Apim-Subscription-Key': subscriptionKey
									}
								};
								max++;
								rp(options).then(async function () {
									console.log('persistedFaceId ' + max + ' borrado');
									if (++cnt === max) {
										options.url = gUriBase;
										request.delete(options, (error, response) => {
											if (!error && response.statusCode !== 404) {
												var uriBase = url + `${personGroupId}/train`;

												let params = {
													personGroupId: personGroupId,
													recognitionModel: 'recognition_02'
												};
												let options = {
													uri: uriBase,
													qs: params,
													headers: {
														'Content-Type': 'application/json',
														'Ocp-Apim-Subscription-Key': subscriptionKey
													}
												};
												request.post(options, async (error, response, body) => {
													if (!error && response.statusCode !== 404) {
														console.log(
															'Borrado de personId ' + response.statusCode + ' === ' + response.statusMessage
														);
													}
												});
											}
										});
									}
								});
							});
						}
					})
					.catch(console.error);
			}
		})
		.catch(console.error);
}

module.exports = { delFaceId };
