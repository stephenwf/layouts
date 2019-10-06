import React from 'react';
import { FullLayout } from '@layouts/core';

// https://dribbble.com/shots/1551954-Hipchat-V-2/attachments/237061
export const HipChat = () => {
  return (
    <FullLayout
      header={
        <div
          style={{
            textAlign: 'center',
            color: '#fff',
            background: '#262838',
            padding: 12,
            fontSize: 20,
          }}
        >
          HipChat
        </div>
      }
      leftContextualHeader={[
        <div
          style={{
            background: '#2C3341',
            color: '#D5DAE9',
            padding: 20,
            height: 60,
          }}
        >
          [icn]
          <span style={{ fontSize: 16 }}>Lobby</span>
        </div>,
      ]}
      leftContextualFooter={[
        <div
          style={{
            background: '#293044',
            color: '#999EB6',
            textAlign: 'center',
            borderTop: '1px solid #313849',
            padding: 15,
          }}
        >
          CREATE NEW ROOM
        </div>,
        <div
          style={{
            background: '#262838',
            borderTop: '1px solid #2C2E3E',
            padding: 20,
          }}
        >
          <div style={{ fontSize: 16, color: '#fff' }}>Name of person</div>
          <div style={{ fontSize: 13, color: '#999EB6' }}>Online.</div>
        </div>,
      ]}
      leftNavigation={
        <div
          style={{ background: '#293041', color: '#D5DAE9', height: '100%' }}
        >
          <div style={{ padding: 20, borderBottom: '1px solid #2F3647' }}>
            Some name
          </div>
          <div style={{ padding: 20, borderBottom: '1px solid #2F3647' }}>
            Some name
          </div>
          <div style={{ padding: 20, borderBottom: '1px solid #2F3647' }}>
            Some name
          </div>
          <div style={{ padding: 20, borderBottom: '1px solid #2F3647' }}>
            Some name
          </div>
        </div>
      }
      rightSidebar={
        <div style={{ height: '100%', background: '#F5F4F7' }}>
          <div
            style={{
              background: '#2D3445',
              color: '#fff',
              display: 'flex',
              width: '100%',
            }}
          >
            <div
              style={{
                flex: 1,
                textAlign: 'center',
                padding: 10,
                fontSize: 16,
              }}
            >
              Lobby
            </div>
            <div
              style={{
                flex: 1,
                textAlign: 'center',
                padding: 10,
                fontSize: 16,
              }}
            >
              Files
            </div>
            <div
              style={{
                flex: 1,
                textAlign: 'center',
                padding: 10,
                fontSize: 16,
              }}
            >
              Links
            </div>
          </div>
          <div>
            <div style={{ padding: 10, color: '#5E5E5E', paddingLeft: 20 }}>
              [o] Person 1
            </div>
            <div style={{ padding: 10, color: '#5E5E5E', paddingLeft: 20 }}>
              [o] Person 2
            </div>
            <div style={{ padding: 10, color: '#5E5E5E', paddingLeft: 20 }}>
              [o] Person 3
            </div>
            <div style={{ padding: 10, color: '#5E5E5E', paddingLeft: 20 }}>
              [o] Person 4
            </div>
          </div>
        </div>
      }
      contentHeader={[
        <div
          style={{
            background: '#E6E8EA',
            padding: 20,
            height: 60,
            borderBottom: '1px solid #D1D1D3',
            fontSize: 18,
          }}
        >
          Design and Concept discussions
          <input
            type="search"
            style={{
              display: 'inline-block',
              width: '400px',
              marginLeft: 40,
            }}
          />
        </div>,
      ]}
    >
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
    </FullLayout>
  );
};

const Chat = () => (
  <div style={{ display: 'flex' }}>
    <div
      style={{
        textAlign: 'center',
        background: '#F5F4F7',
        padding: 20,
        border: '1px solid #E5E5E5',
        borderBottom: 'none',
      }}
    >
      Some name 1
    </div>
    <div
      style={{
        flex: '1 1 0px',
        padding: 20,
        border: '1px solid #E5E5E5',
        borderBottom: 'none',
        borderLeft: 'none',
      }}
    >
      Some text that was mentioned
    </div>
  </div>
);
