import React from 'react'
import { Form, Segment, Image, Icon, Header } from 'semantic-ui-react';



function ImageDropDiv({media,
    mediaPreview,
    highlighted,
    setHighlighted,
    inputRef,
    handleChange,
    setMedia,
    setMediaPreview}) {
        function handleDragOver(e){
            e.preventDefault()
            setHighlighted(true)
        }

        function handleDragLeave(e){
            e.preventDefault()
            setHighlighted(false)
        }

        function handleDrop(e){
            e.preventDefault()
            setHighlighted(true)
            const droppedFiles = Array.from(e.dataTransfer.files)
            console.log(droppedFiles)
            console.log(URL.createObjectURL(droppedFiles[0]))
            setMedia(droppedFiles[0]);
            setMediaPreview(URL.createObjectURL(droppedFiles[0]))
        }
    return (
      <>
        <Form.Field>
          <Segment  placeholder basic secondary>
            <input
              style={{ display: "none" }}
              type="file"
              accept="image/*"
              onChange={handleChange}
              name="media"
              ref={inputRef}
            />

            <div
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
              {mediaPreview === null ? (
                <>
                  <Segment color={highlighted ? "green" : ""} textAlign="center">
                    <Header icon>
                      <Icon
                        name="file image outline"
                        style={{ cursor: "pointer" }}
                        onClick={() => inputRef.current.click()}
                      />
                      Drag and drop or Click to upload image
                    </Header>
                  </Segment>
                </>
              ) : (
                <>
                  <Segment color="green" placeholder basic>
                    <Image
                      src={mediaPreview}
                      size="medium"
                      centered
                      style={{ cursor: "pointer" }}
                      onClick={() => inputRef.current.click()}
                    />
                  </Segment>
                </>
              )}
            </div>
          </Segment>
        </Form.Field>
      </>
    );
}

export default ImageDropDiv
