import * as React from 'react'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'

import Section from '../../app/components/section'

import UnlockButton from './unlockButton'
import { DisplaySpendContract } from './display'

import SpendInputs from './argsDisplay'
import {getContractTemplateName, getContractProgram, getUtxoId, getUtxoInfo, getContract} from '../selectors'
import { ContractValue } from './argsDisplay'
import {fetchUtxoInfo, setContractName, setUtxoID} from "../actions"

const mapStateToProps = (state) => {
  const contractName = getContractTemplateName(state)
  const contractProgram = getContractProgram(state)
  const utxoInfo = getUtxoInfo(state)
  const utxoId = getUtxoId(state)
  const contract = getContract(state)

  const display = contract.contractProgram === contractProgram && utxoId
  return { error: null, display: display }
}

const mapDispatchToContractInputProps = (dispatch) => {
  return {
    fetch: () => {
      dispatch(fetchUtxoInfo())
    }
  }
}

export const Unlock = ({ error, display }) => {
  let summary = (<div className="table-placeholder">No Contract Found</div>)
  let details = (<div className="table-placeholder">No Details Found</div>)
  let button

  if (display) {
    summary = (
      <div className="form-wrapper with-subsections">
        <section>
          <h4>Contract Template</h4>
          <DisplaySpendContract />
        </section>
        <ContractValue />
        <SpendInputs />
      </div>
    )

    details = (
      <div className="form-wrapper with-subsections">
        {/*<ClauseSelect />*/}
        {/*<ClauseValue />*/}
        {/*<ClauseParameters />*/}
        {/*<UnlockDestination />*/}
      </div>
    )
  }

  return (
    <DocumentTitle title="Unlock Value">
      <div>
        <Section name="Contract Summary">
          {summary}
        </Section>
        <Section name="Unlocking Details">
          {details}
        </Section>
        <UnlockButton />
      </div>
    </DocumentTitle>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToContractInputProps
)(Unlock)
