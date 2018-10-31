import * as monaco from 'monaco-editor';
import * as React from 'react';

export function processSize(size: string) {
  return !/^\d+$/.test(size) ? size : `${size}px`;
}

type State = {};
type Props = {
  language: string;
  height: string;
  width: string;
  theme: any;
  editorDidMount: any;
  editorWillMount: any;
  onChange: any;
  defaultValue: any;
  options: any;
  value: string | null;
};
class MonacoEditor extends React.Component<Props, State> {
  static defaultProps: Props = {
    width: '100%',
    height: '100%',
    value: null,
    defaultValue: '',
    language: 'javascript',
    theme: null,
    options: {},
    editorDidMount: () => false,
    editorWillMount: () => false,
    onChange: () => false
  };
  containerElement: HTMLElement | undefined;
  __current_value: string | null;
  editor: any;
  __prevent_trigger_change_event: any;

  constructor(props: Props) {
    super(props);
    this.containerElement = undefined;
    this.__current_value = props.value;
  }

  componentDidMount() {
    this.initMonaco();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.value !== this.__current_value) {
      // Always refer to the latest value
      this.__current_value = this.props.value;
      // Consider the situation of rendering 1+ times before the editor mounted
      if (this.editor) {
        this.__prevent_trigger_change_event = true;
        this.editor.setValue(this.__current_value);
        this.__prevent_trigger_change_event = false;
      }
    }
    if (prevProps.language !== this.props.language) {
      monaco.editor.setModelLanguage(
        this.editor.getModel(),
        this.props.language
      );
    }
    if (prevProps.theme !== this.props.theme) {
      monaco.editor.setTheme(this.props.theme);
    }
    if (
      this.editor &&
      (this.props.width !== prevProps.width ||
        this.props.height !== prevProps.height)
    ) {
      this.editor.layout();
    }
  }

  componentWillUnmount() {
    this.destroyMonaco();
  }

  editorWillMount() {
    const { editorWillMount } = this.props;
    const options = editorWillMount(monaco);
    return options || {};
  }

  editorDidMount(editor: any) {
    this.props.editorDidMount(editor, monaco);
    editor.onDidChangeModelContent((event: any) => {
      const value = editor.getValue();

      // Always refer to the latest value
      this.__current_value = value;

      // Only invoking when user input changed
      if (!this.__prevent_trigger_change_event) {
        this.props.onChange(value, event);
      }
    });
  }

  initMonaco() {
    const value =
      this.props.value !== null ? this.props.value : this.props.defaultValue;
    const { language, theme, options } = this.props;
    if (this.containerElement) {
      // Before initializing monaco editor
      Object.assign(options, this.editorWillMount());
      this.editor = monaco.editor.create(this.containerElement, {
        value,
        language,
        ...options
      });
      if (theme) {
        monaco.editor.setTheme(theme);
      }
      // After initializing monaco editor
      this.editorDidMount(this.editor);
    }
  }

  destroyMonaco() {
    if (typeof this.editor !== 'undefined') {
      this.editor.dispose();
    }
  }

  assignRef = (component: any) => {
    this.containerElement = component;
  };

  render() {
    const { width, height } = this.props;
    const fixedWidth = processSize(width);
    const fixedHeight = processSize(height);
    const style = {
      width: fixedWidth,
      height: fixedHeight
    };

    return (
      <div
        ref={this.assignRef}
        style={style}
        className="react-monaco-editor-container"
      />
    );
  }
}

export default MonacoEditor;
