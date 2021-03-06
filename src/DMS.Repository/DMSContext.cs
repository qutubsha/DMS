﻿using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using DMS.Abstraction;
using DMS.Abstraction.Revisions;
using DMS.Abstraction.EmailTemplate;
using DMS.Abstraction.ConfigurationSettings;
using DMS.Abstraction.SharedDocumentUsers;

namespace DMS.Repository
{
    public class DMSContext
    {
        private readonly IMongoDatabase _database = null;

        public DMSContext(IOptions<Settings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            if (client != null)
                _database = client.GetDatabase(settings.Value.Database);
        }

        public IMongoCollection<Company> Companies
        {
            get
            {
                return _database.GetCollection<Company>("Company");
            }
        }


        public IMongoCollection<User> Users
        {
            get
            {
                return _database.GetCollection<User>("User");
            }
        }

        public IMongoCollection<Role> Roles
        {
            get
            {
                return _database.GetCollection<Role>("Roles");
            }
        }

        public IMongoCollection<Rights> Rights
        {
            get
            {
                return _database.GetCollection<Rights>("Rights");
            }
        }

        public IMongoCollection<DocumentAccessHistory> AccessHistory
        {
            get
            {
                return _database.GetCollection<DocumentAccessHistory>("DocumentAccessHistory");
            }
        }

        public IMongoCollection<Document> Documents
        {
            get
            {
                return _database.GetCollection<Document>("Documents");
            }
        }

        public IMongoCollection<Revision> Revisions
        {
            get
            {
                return _database.GetCollection<Revision>("Revisions");
            }
        }

        public IMongoCollection<EmailTemplate> EmailTemplate
        {
            get
            {
                return _database.GetCollection<EmailTemplate>("EmailTemplate");
            }
        }

        public IMongoCollection<ConfigurationSetting> ConfigurationSettings
        {
            get
            {
                return _database.GetCollection<ConfigurationSetting>("ConfigurationSettings");
            }
        }

        public IMongoCollection<SharedDocumentUser> SharedDocumentUsers
        {
            get
            {
                return _database.GetCollection<SharedDocumentUser>("SharedDocumentUsers");
            }
        }
    }
}
