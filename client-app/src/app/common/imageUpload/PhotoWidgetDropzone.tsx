import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Header, Icon } from "semantic-ui-react";

interface Props {
  setFiles: (files: { preview: string }[]) => void;
}

export default function PhotoWidgetDropzone({ setFiles }: Props) {
  const dzStyles = {
    border: "dashed 3px #eee",
    borderColor: "#eee",
    borderRadius: "5px",
    paddingTop: "30px",
    textAlign: "center" as const,
    height: 200,
  };

  const dzActive = {
    borderColor: "green",
  };

  const dzReject = {
    borderColor: "red",
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(
        acceptedFiles.map((file: File) => ({
          ...file,
          preview: URL.createObjectURL(file),
        }))
      );
    },
    [setFiles]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    acceptedFiles,
  } = useDropzone({ onDrop });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setFiles(
        acceptedFiles.map((file: File) => ({
          ...file,
          preview: URL.createObjectURL(file),
        }))
      );
    }
  }, [acceptedFiles, setFiles]);

  return (
    <div
      {...getRootProps()}
      style={
        isDragActive
          ? isDragAccept
            ? { ...dzStyles, ...dzActive }
            : { ...dzStyles, ...dzReject }
          : dzStyles
      }
    >
      <input {...getInputProps()} />
      <Icon name="upload" size="huge" />
      <Header content="Drop image here" />
    </div>
  );
}
