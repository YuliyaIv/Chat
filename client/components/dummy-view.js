import React from 'react'

const Dummy = () => {
  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-indigo-800 hover:text-red-500 text-white font-bold rounded-lg border shadow-lg p-10">
          {
            ({
              idUser13546865464: {
                nameUser: 'Lolo',
                avatar: 'fslkfls;',
                password: 'sdfnls',
                email: 'askjdlaskjd@gmail.com',
                phone: '46648-13541',
                channelsAccess: [],
                channelsOvner: [],
                userMetaDate: {}
              }
            },
            {
              idChannel5154651356: {
                channelName: 'name',
                channelAdmin: 'idUser13546865464',
                listUsersAccess: ['idUser13546865464', 'idUser13546865464', 'idUser13546865464'],
                chatDataMessage: [
                  {
                    idMessage: 'id465468',
                    idUserPostedMessage: 'idUser13546865464',
                    textMessage: 'text message',
                    metaDataMessage: {
                      timeCreateMessage: 'itd',
                      timeDeleteMessage: 'itd'
                    }
                  }
                ],
                metaDataChannel: {
                  timeCreateChannel: 'itd',
                  timeDeleteChannel: 'itd'
                }
              }
            })
          }
        </div>
      </div>
    </div>
  )
}

Dummy.propTypes = {}

export default React.memo(Dummy)
