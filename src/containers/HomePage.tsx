import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import FolderIcon from '@material-ui/icons/Folder';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
// @ts-ignore
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/xml';
import 'brace/theme/chaos';

import { defaultValueCSV, defaultValueXML } from '../constants/default-values';
import { xmlToCsvHeader } from '../lib/extract-keys-from-text';
import { openFileDialogReturnPath } from '../lib/file-utils';
import inject from '../lib/inject-values-into-template';
import createFilePaths from '../lib/create-filepaths-from-csv-string';
import createFiles from '../lib/create-files';
import { getFromStore, storeAndReturn } from '../lib/localStore';
const swal = require('sweetalert');

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`;
export const EditorsWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
export const EditorWrapper = styled.div`
  display: flex;
  flex-grow: 1;
`;
export const OutputLocationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
`;

type Props = {};
type State = {
  csv: string;
  xml: string;
  outputFolder: string;
};
class HomePage extends React.Component<Props, State> {
  static defaultProps: Props = {};
  state = {
    csv: getFromStore('csv', defaultValueCSV),
    xml: getFromStore('xml', defaultValueXML),
    outputFolder: getFromStore('outputFolder', '')
  };

  onChangeCSV = (val: string) => {
    this.setState({
      csv: storeAndReturn('csv', val)
    });
  };
  onChangeXML = (val: string) => {
    // @ts-ignore
    const [_, ...newCsvList] = this.state.csv.split('\n');
    this.setState({
      xml: storeAndReturn('xml', val),
      csv: storeAndReturn(
        'csv',
        `${xmlToCsvHeader(val)}\n${newCsvList.join('\n')}`
      )
    });
  };
  onBrowseFolderClick = async () => {
    const value = await openFileDialogReturnPath();
    this.setState({
      outputFolder: storeAndReturn('outputFolder', `${value}`)
    });
  };
  handleOutputFolderChange = (e: any) => {
    this.setState({
      outputFolder: storeAndReturn('outputFolder', e.target.value)
    });
  };
  onDoItClick = async () => {
    const filepaths: string[] = createFilePaths(
      this.state.csv,
      this.state.outputFolder
    );
    const value = await swal(
      'Create the following files?\n' + filepaths.join('\n'),
      {
        buttons: {
          no: true,
          yes: true
        }
      }
    );
    switch (value) {
      case 'yes':
        try {
          const injectedTemplates = inject(this.state.csv, this.state.xml);
          await createFiles(filepaths, injectedTemplates);
          swal('Success!', 'Opening Folder', 'success');
          const { shell } = require('electron'); // deconstructing assignment
          shell.openItem(this.state.outputFolder);
        } catch (e) {
          swal('Error', e.toString(), 'error');
        }
        break;
      default:
        return;
    }
  };

  render() {
    const { xml, csv, outputFolder } = this.state;
    return (
      <Wrapper>
        <OutputLocationWrapper>
          <TextField
            onChange={this.handleOutputFolderChange}
            value={outputFolder}
            fullWidth
            placeholder={'Output Location'}
          />
          <div style={{ width: '15px' }} />
          <Tooltip title={'Select Output Folder'}>
            <Button
              variant={'contained'}
              color={'primary'}
              onClick={this.onBrowseFolderClick}
            >
              <FolderIcon /> <span>Browse</span>
            </Button>
          </Tooltip>
        </OutputLocationWrapper>
        <EditorsWrapper>
          <EditorWrapper>
            <AceEditor
              value={csv}
              mode="text"
              height={'100%'}
              width={'100%'}
              theme="chaos"
              showPrintMargin={false}
              onChange={this.onChangeCSV}
              name="change1"
              editorProps={{ $blockScrolling: true }}
            />
          </EditorWrapper>
          <EditorWrapper>
            <AceEditor
              value={xml}
              mode="xml"
              height={'100%'}
              width={'100%'}
              theme="chaos"
              onChange={this.onChangeXML}
              name="change2"
              showPrintMargin={false}
              editorProps={{ $blockScrolling: true }}
            />
          </EditorWrapper>
        </EditorsWrapper>
        <Tooltip
          title={
            outputFolder.length > 0
              ? 'Batch Create Files'
              : 'Output Folder Required!'
          }
        >
          <div>
            <Button
              fullWidth
              disabled={outputFolder.length <= 0}
              color={'primary'}
              onClick={this.onDoItClick}
              variant={'contained'}
            >
              Do it
            </Button>
          </div>
        </Tooltip>
      </Wrapper>
    );
  }
}

export default connect()(HomePage);
